interface Props {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategorySelector({ category, setCategory }: Props) {
  return (
    <>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`mt-6 h-14 w-full appearance-none rounded-md border border-[#A1A1A1] bg-[url('/icons/selectArrow_icon.svg')] bg-no-repeat bg-right px-2 text-lg focus:outline-none ${category ? 'text-black' : 'text-gray-800'}`}
      >
        <option value="" disabled hidden>
          카테고리
        </option>
        <option value="문화예술">문화예술</option>
        <option value="식음료">식음료</option>
        <option value="스포츠">스포츠</option>
        <option value="투어">투어</option>
        <option value="관광">관광</option>
        <option value="웰빙">웰빙</option>
      </select>
    </>
  );
}
