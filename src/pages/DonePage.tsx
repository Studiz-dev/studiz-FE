import Text from '../components/Text';
import CheckIcon from '../icons/check-icon.svg';

export default function DonePage() {
  return (
 <div>
    <header className="pt-[61.5px]">
      <Text
        variant="Sem18"
        className="text-black1 text-center"
      >
        가입 완료
      </Text>
    </header>

    <main className="flex flex-col items-center justify-center"> 
      <img src={CheckIcon} alt="체크 아이콘" width={96} height={96} className="mt-[223.5px]" />
      <Text
        variant="Sem18"
        className="text-black1 mt-5"
      >
        <p>회원가입이 완료되었습니다.</p>
      </Text>
      <Text
        variant="Med14"
        className="text-gray3 mt-2"
      >
        <p>시작하기를 눌러 스터디즈를 이용해 보세요!</p>
      </Text>
    </main>

    <footer className="w-full pt-[249px] ">
      <button
        type="button"
        className="w-full py-3 rounded-lg bg-point"
      >
        <Text
          variant="Sem18"
          className="text-white1"
        >
          시작하기
        </Text>
      </button>
    </footer>
  </div>
  );
}
