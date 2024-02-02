import { Header } from "shared/types";
import { throttle } from "lodash-es";

const NAV_HEIGHT = 56;

export function bindingAsideScroll() {
  if (typeof window !== "undefined") {
    let links: HTMLAnchorElement[] = [];
    const marker = document.getElementById("aside-marker");
    const aside = document.getElementById("aside-container");
    // 需要提前取出 headers
    const headers = Array.from(aside?.getElementsByTagName("a") || []).map(
      (item) => decodeURIComponent(item.hash)
    );

    if (!aside) {
      return;
    }

    const setActiveLink = () => {
      links = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          ".island-doc .header-anchor"
        )
      ).filter((item) => item.parentElement?.tagName !== "H1");

      const isBottom =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight;
      // 1. 如果已经滑动到底部，我们将最后一个 link 高亮即可
      if (isBottom) {
        activate(links, links.length - 1);
        return;
      }

      // 2. 遍历 links，寻找对应锚点
      for (let i = 0; i < links.length; i++) {
        const currentAnchor = links[i];
        const nextAnchor = links[i + 1];
        const scrollTop = Math.ceil(window.scrollY);
        const currentAnchorTop =
          currentAnchor.parentElement.offsetTop - NAV_HEIGHT;
        // 高亮最后一个锚点
        if (!nextAnchor) {
          activate(links, i);
          break;
        }
        // 高亮第一个锚点的情况
        if ((i === 0 && scrollTop < currentAnchorTop) || scrollTop == 0) {
          activate(links, 0);
          break;
        }
        // 如果当前 scrollTop 在 i 和 i + 1 个锚点之间
        const nextAnchorTop = nextAnchor.parentElement.offsetTop - NAV_HEIGHT;
        if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
          activate(links, i);
          break;
        }
      }
    };

    const activate = (links: HTMLAnchorElement[], index: number) => {
      if (links[index]) {
        const id = links[index].getAttribute("href");
        const tocIndex = headers.findIndex((item) => item === id);
        const currentLink = aside?.querySelector(`a[href="#${id.slice(1)}"]`);
        if (currentLink) {
          // 设置高亮样式
          marker.style.top = `${33 + tocIndex * 28}px`;
          marker.style.opacity = "1";
        }
      }
    };

    const throttledSetActiveLink = throttle(setActiveLink, 100);

    window.addEventListener("scroll", throttledSetActiveLink);

    // 返回事件解绑逻辑，供 TOC 组件调用，避免内存泄露
    return () => {
      window.removeEventListener("scroll", throttledSetActiveLink);
    };
  }
}

export function scrollToTarget(header: Header, isSmooth: boolean) {
  if (typeof window !== "undefined") {
    const target = document.getElementById(header.id);
    const targetPadding = parseInt(
      window.getComputedStyle(target).paddingTop,
      10
    );
    const targetTop =
      window.scrollY +
      target.getBoundingClientRect().top +
      targetPadding -
      NAV_HEIGHT;
    window.scrollTo({
      left: 0,
      top: targetTop,
      behavior: isSmooth ? "smooth" : "auto"
    });
  }
}
