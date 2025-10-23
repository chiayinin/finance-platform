import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([ // 需要進行身份驗證的路由
  // '/sign-in(.*)' 指 sign-in 後面接的所有路徑
  '/', // 只要進入首頁就要登入
  // '/api(.*)', // 打 API 的話需要先登入
]);

export default clerkMiddleware(async (auth, request) => {
  if(isPublicRoute(request)) {
    await auth.protect(); // 強制登入
  }

  return NextResponse.next(); // 繼續處理請求，表示中介軟體處理完畢，繼續交由下一個處理程序（例如頁面渲染）。
});

export const config = {
  matcher: [ // 設定哪些路由會觸發這個 middleware
    // 排除 Next.js 的內部資源與靜態檔案，避免對圖片、樣式等靜態資源進行身份驗證。
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // 所有 /api 或 /trpc 開頭的 API 路由都會觸發 middleware。
    '/(api|trpc)(.*)',
  ],
};
