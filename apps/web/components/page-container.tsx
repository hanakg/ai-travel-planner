import { PropsWithChildren } from "react";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full py-10 px-9 gap-10.5">
      {children}
    </div>
  );
};
