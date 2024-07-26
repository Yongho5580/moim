import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">모임에 참여하기 위한 과정이에요!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input
          name="phone"
          type="number"
          placeholder="휴대폰 번호"
          required
          errors={[]}
        />
        <Input
          name="verify"
          type="number"
          placeholder="인증 번호"
          required
          errors={[]}
        />
        <Button loading={false} text="인증하기" />
      </form>
    </div>
  );
}
