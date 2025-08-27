import "../../css/globals.css";
import { ReactNode } from "react";


const layout = ({ children }: { children: ReactNode }) => {
  return (
    
    <main className="flex flex-col md:flex-row min-h-screen w-full">
  {/* Ілюстрація */}
  <section className="flex-1 order-1 md:order-2">
    <img
      src="/many books.jpg"
      alt="many books"
      className="w-full h-full object-cover min-h-[300px] md:min-h-0"
    />
  </section>

  {/* Форма */}
  <section className="flex-1 order-2 md:order-1 flex  justify-center bg-gradient-to-br from-neutral-900 to-neutral-400 min-h-screen">
    <div className="auth-box w-full max-w-md p-6">
      <div className="flex items-center justify-center gap-3 mb-6">
        <img
          src="/book-logo_1.svg"
          alt="book-logo_1"
          width={37}
          height={37}
          className="rounded-2xl"
        />
        <h1 className="auth-title text-white text-2xl">BookWise</h1>
      </div>
      <div className="text-white">{children}</div>
    </div>
  </section>
</main>
  );
};

export default layout;
