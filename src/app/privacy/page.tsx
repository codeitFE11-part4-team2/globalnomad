'use client';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">개인정보 처리방침</h1>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          1. 개인정보의 처리 목적
        </h2>
        <p className="text-gray-700 mb-4">
          글로벌노마드는 다음의 목적을 위하여 개인정보를 처리합니다:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>회원 가입 및 관리</li>
          <li>서비스 제공 및 계약의 이행</li>
          <li>고객 상담 및 불만 처리</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          2. 개인정보의 처리 및 보유기간
        </h2>
        <p className="text-gray-700">
          회원 탈퇴 시까지 개인정보를 보유합니다. 단, 관계 법령에 따라 필요한
          경우 해당 법령에서 정한 기간 동안 보관됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          3. 개인정보의 제3자 제공
        </h2>
        <p className="text-gray-700">
          글로벌노마드는 이용자의 개인정보를 원칙적으로 외부에 제공하지
          않습니다. 단, 다음의 경우는 예외로 합니다:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>이용자가 사전에 동의한 경우</li>
          <li>
            법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에
            따라 수사기관의 요구가 있는 경우
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          4. 이용자의 권리와 의무
        </h2>
        <p className="text-gray-700">
          이용자는 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를
          예방해야 합니다. 입력한 부정확한 정보로 인해 발생하는 사고의 책임은
          이용자 자신에게 있으며, 타인 정보의 도용 등 허위정보를 입력할 경우
          회원자격이 상실될 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          5. 개인정보 보호책임자
        </h2>
        <p className="text-gray-700">
          개인정보 보호책임자: 글로벌노마드 개인정보보호팀
          <br />
          이메일: privacy@globalnomad.com
        </p>
      </section>
    </div>
  );
}
