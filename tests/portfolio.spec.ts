import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = ["vodafone", "ferrari", "spikeme", "zeloclub"];

async function ready(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#hero")).toBeVisible();
  await expect(page.locator("#hero")).toHaveClass(/started/);
  await expect(page.locator("#preloader")).toHaveCount(0);
}

async function expectInViewport(page: Page, selector: string) {
  await expect.poll(async () => page.locator(selector).evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return bounds.left >= -2 && bounds.left < innerWidth && bounds.top < innerHeight && bounds.bottom > 0;
  })).toBe(true);
}

test("language choice persists across refresh and project navigation", async ({ page }) => {
  await ready(page);
  await page.locator(".lang-toggle button").nth(1).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator(".lang-toggle button").nth(1)).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-lang", "pt");
  await page.goto("/project/vodafone/");
  await expect(page.locator("html")).toHaveAttribute("data-lang", "pt");
  await expect(page.locator("#pj-nav .back")).toContainText(/Voltar/);
  await page.locator(".lang-toggle button").first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("all four case studies open and return to the work section", async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/project/${slug}/`);
    await expect(page.locator("main h1")).toContainText(new RegExp(slug, "i"));
    await expect(page.locator(".pj-cover img")).toBeVisible();
    await page.locator("#pj-nav .back").click();
    await expect(page).toHaveURL(/\/#work$/);
    await expectInViewport(page, "#work");
    await expect(page.locator("#rail [data-go='work']")).toHaveAttribute("aria-current", "location");
  }
});

test("desktop anchors and keyboard focus reach horizontal sections", async ({ page }) => {
  await ready(page);
  await expect(page.locator("body")).toHaveClass(/hmode/);
  await page.locator("#nav [data-go='work']").click();
  await expect(page).toHaveURL(/#work$/);
  await expectInViewport(page, "#work");
  await page.locator("#rail [data-go='about']").click();
  await expect(page).toHaveURL(/#about$/);
  await expectInViewport(page, "#about");
  const lastCard = page.locator(".wcard").last();
  await lastCard.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(lastCard).toBeFocused();
  await expectInViewport(page, ".wcard:last-child");
  expect(await lastCard.evaluate((element) => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
  })).toBe(true);
  for (const language of [1, 0]) {
    await page.locator(".lang-toggle button").nth(language).click();
    await lastCard.focus();
    await expectInViewport(page, ".wcard:last-child");
  }
});

test("skip link and reduced-motion preference keep native vertical navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  await expect(page.locator("body")).not.toHaveClass(/hmode/);
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#work")).toBeFocused();
  await page.locator("#rail [data-go='work']").click();
  await expect(page).toHaveURL(/#work$/);
  await expectInViewport(page, "#work");
});

test("mobile layout retains visible navigation and avoids horizontal overflow", async ({ browser }) => {
  for (const width of [390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await ready(page);
    await expect(page.locator("body")).not.toHaveClass(/hmode/);
    expect(await page.evaluate(() => innerWidth)).toBe(width);
    expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(width);
    await page.locator(".lang-toggle button").nth(1).click();
    await page.locator("#rail [data-go='work']").click();
    await expectInViewport(page, "#work");
    await expect(page.locator("#rail [data-go='work']")).toHaveAttribute("aria-current", "location");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.goto("/project/zeloclub/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await context.close();
  }
});

test("home and case study pass automated WCAG A and AA checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/project/vodafone/"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  }
});

test("short desktop windows preserve wheel-driven horizontal browsing", async ({ browser }) => {
  for (const viewport of [{ width: 1280, height: 640 }, { width: 1024, height: 600 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await ready(page);
    await expect(page.locator("body")).toHaveClass(/hmode/);
    const initialLeft = await page.locator("#htrack").evaluate((element) => element.getBoundingClientRect().left);
    await page.mouse.move(viewport.width / 2, viewport.height / 2);
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.locator("#htrack").evaluate((element) => element.getBoundingClientRect().left)).toBeLessThan(initialLeft - 100);
    await page.locator("#rail [data-go='work']").click();
    await expectInViewport(page, "#work");
    await page.locator(".wcard").last().focus();
    await expectInViewport(page, ".wcard:last-child");
    for (const language of [0, 1]) {
      await page.locator(".lang-toggle button").nth(language).click();
      await page.locator("#rail [data-go='work']").click();
      await expectInViewport(page, "#work");
      await expect.poll(() => page.evaluate(() => {
        const navBottom = document.querySelector("#nav")!.getBoundingClientRect().bottom;
        const titleTop = document.querySelector("#work .wh-big")!.getBoundingClientRect().top;
        const imageTop = document.querySelector("#work .wc-img")!.getBoundingClientRect().top;
        return Math.min(titleTop, imageTop) - navBottom;
      })).toBeGreaterThanOrEqual(8);
      for (const section of ["hero", "about", "caps", "div", "footer"]) {
        await page.locator(`#rail [data-go='${section}']`).click();
        await expectInViewport(page, `#${section}`);
        const wrapper = page.locator(`#${section} > .wrap`);
        const fits = await wrapper.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top >= 72 && bounds.bottom <= innerHeight - 64;
        });
        if (!fits) {
          // A compact panel may scroll internally; its last control must remain reachable.
          const panel = page.locator(`#${section}`);
          expect(await panel.evaluate((element) => ["auto", "scroll"].includes(getComputedStyle(element).overflowY))).toBe(true);
          await panel.evaluate((element) => { element.scrollTop = element.scrollHeight; });
          expect(await wrapper.evaluate((element) => {
            const bounds = element.getBoundingClientRect();
            return bounds.bottom > 72 && bounds.bottom <= innerHeight - 64;
          })).toBe(true);
          const lastControl = panel.locator("a, button").last();
          if (await lastControl.count()) {
            await lastControl.focus();
            await expect.poll(() => lastControl.evaluate((element) => {
              const bounds = element.getBoundingClientRect();
              return bounds.top >= 72 && bounds.bottom <= innerHeight - 64;
            })).toBe(true);
          }
        }
      }
    }
    await context.close();
  }
});

test("JavaScript-free visits keep projects reachable", async ({ browser }) => {
  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const noScriptPage = await noScript.newPage();
  await noScriptPage.goto("/");
  await expect(noScriptPage.locator("#hero h1:visible")).toBeVisible();
  await expect(noScriptPage.locator("#preloader")).toHaveCount(0);
  await noScriptPage.locator("#nav [data-go='work']").click();
  await expectInViewport(noScriptPage, "#work");
  await expect(noScriptPage.locator(".wcard")).toHaveCount(4);
  expect(await noScriptPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await noScript.close();
});

test("pages load without runtime errors, failed assets or original oversized images", async ({ page }) => {
  const failures: string[] = [];
  const requested: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") failures.push(message.text()); });
  page.on("response", (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  page.on("requestfailed", (request) => {
    const message = request.failure()?.errorText ?? "";
    if (!message.includes("ERR_ABORTED")) failures.push(`${message} ${request.url()}`);
  });
  page.on("request", (request) => requested.push(new URL(request.url()).pathname));
  for (const route of ["/", ...slugs.map((slug) => `/project/${slug}/`)]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("main")).toBeVisible();
  }
  expect(failures).toEqual([]);
  expect(requested).not.toContain("/isaac.png");
  expect(requested).not.toContain("/fav.svg");
});

test("language controls remain usable when browser storage is blocked", async ({ browser }) => {
  for (const blockReads of [false, true]) {
    const context = await browser.newContext();
    await context.addInitScript((denyReads) => {
      const originalGet = Storage.prototype.getItem;
      const originalSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === "iv-lang") throw new DOMException("Storage blocked", "SecurityError");
        return originalSet.call(this, key, value);
      };
      Storage.prototype.getItem = function (key) {
        if (key !== "iv-lang") return originalGet.call(this, key);
        if (denyReads) throw new DOMException("Storage blocked", "SecurityError");
        return "en";
      };
    }, blockReads);
    const page = await context.newPage();
    await ready(page);
    await page.locator(".lang-toggle button").nth(1).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await page.locator(".lang-toggle button").first().click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await context.close();
  }
});

test("changing reduced-motion at runtime preserves the current section", async ({ page }) => {
  await ready(page);
  await page.locator("#nav [data-go='work']").click();
  await expectInViewport(page, "#work");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("body")).not.toHaveClass(/hmode/);
  await expectInViewport(page, "#work");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("body")).toHaveClass(/hmode/);
  await expectInViewport(page, "#work");
});

test("translated content is revealed when changing language in horizontal panels", async ({ page }) => {
  await ready(page);
  for (const section of ["about", "caps", "div"]) {
    await page.locator(".lang-toggle button").first().click();
    await page.locator(`#rail [data-go='${section}']`).click();
    await expectInViewport(page, `#${section}`);
    await page.locator(".lang-toggle button").nth(1).click();
    const translated = page.locator(`#${section} [data-lang='pt'][data-fade]`).first();
    await expect(translated).toBeVisible();
    await expect(translated).toHaveCSS("opacity", "1");
  }
});
