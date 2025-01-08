"use client";
import { logger } from "@pt/logger";
import { useParams } from "next/navigation";

const messages: {
  [key: string]: Record<string, string>;
} = {
  en: {
    notFound: "Page not found",
    oops: "Oops",
    somethingWentWrong: "Something went wrong",
    tryAgain: "Try again",
    desc: "We're sorry for the inconvenience. Our team has been notified and is working on it.",
  },
  zh: {
    notFound: "未找到页面",
    oops: "操作失败",
    somethingWentWrong: "出错了",
    tryAgain: "请重试",
    desc: "很抱歉给您带来不便，团队已经收到正在全力以赴解决",
  },
};

// global error is not wrappered in locale layout
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = params.locale as string;

  // Display in browser console
  logger.error(`Unhandled global error: ${error.message}, locale: ${locale}`);

  return (
    <html>
      <body className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
        <div className='text-center space-y-6 max-w-md'>
          <div className='space-y-3'>
            <h1 className='text-4xl font-bold text-gray-900'>
              {messages[locale]!.oops}!
            </h1>
            <h2 className='text-xl text-gray-600'>
              {messages[locale]!.somethingWentWrong}
            </h2>
            <p className='text-gray-500'>{messages[locale]!.desc}</p>
          </div>

          <button
            onClick={reset}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            {messages[locale]!.tryAgain}
          </button>

          {process.env.NODE_ENV === "development" && (
            <div className='text-left p-4 bg-gray-100 rounded-lg'>
              <p className='text-sm font-mono text-gray-600'>{error.message}</p>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
