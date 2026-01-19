<script setup lang="ts">
import { onMounted, watch, nextTick } from "vue";
import { useRoute, inBrowser } from "vitepress";

const route = useRoute();

function addManualPageClasses() {
  // 确保只在浏览器环境中执行
  if (!inBrowser) return;
  
  nextTick(() => {
    if (!inBrowser) return;
    
    const docElement = document.querySelector(".vp-doc");
    if (!docElement) {
      // 如果还没找到元素，延迟重试
      setTimeout(addManualPageClasses, 50);
      return;
    }

    // 清除之前的 class
    docElement.classList.remove("en-manual", "cn-manual");

    const pathname = route.path;

    // 检查是否是英文手册页面
    if (pathname.includes("/manuals/normal-user") && !pathname.includes("/cn/")) {
      docElement.classList.add("en-manual");
    }

    // 检查是否是中文手册页面
    if (pathname.includes("/cn/manuals/normal-user")) {
      docElement.classList.add("cn-manual");
    }
  });
}

// 页面加载时执行（只在客户端）
onMounted(() => {
  if (inBrowser) {
    addManualPageClasses();
  }
});

// 路由变化时执行（只在客户端）
if (inBrowser) {
  watch(
    () => route.path,
    () => {
      // 延迟执行以确保 DOM 已更新
      setTimeout(() => {
        addManualPageClasses();
      }, 150);
    },
    { immediate: true }
  );
}
</script>

<template>
  <!-- 空组件，仅用于执行脚本 -->
</template>
