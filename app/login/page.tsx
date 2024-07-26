import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">어서오세요!</h1>
        <h2 className="text-xl">함께 하는 즐거움, 모임</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" placeholder="이메일" required errors={[]} />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormButton loading={false} text="회원 가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
