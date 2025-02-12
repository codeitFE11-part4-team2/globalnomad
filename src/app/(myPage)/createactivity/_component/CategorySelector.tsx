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
        className="w-full text-lg h-14 mt-6 border border-gray-800 rounded-md px-2 focus:outline-none text-gray-800 appearance-none bg-[url('/icons/selectArrow_icon.svg')] bg-no-repeat bg-right"
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
