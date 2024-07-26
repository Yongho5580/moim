import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="휴대폰 번호"
          required
          errors={[]}
        />
        <FormInput type="number" placeholder="인증 번호" required errors={[]} />
        <FormButton loading={false} text="인증하기" />
      </form>
    </div>
  );
}
