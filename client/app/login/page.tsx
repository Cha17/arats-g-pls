import SignIn from "@/components/auth/signin";
import { AuthButtons } from "../../components/auth/auth-buttons";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center my-20 mx-auto w-full max-w-md">
      <SignIn />
    </div>
  );
}
