import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <div className="grid-cols-1 grid h-screen md:grid-cols-2">
      <div className="flex justify-center w-[100%]">
        <Auth type="signup"/>
      </div>
      <div className=" hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
