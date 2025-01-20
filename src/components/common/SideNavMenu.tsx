import Image from 'next/image';

export default function SideNavMenu() {
  return (
    <div className="w-[384px] h-[432px] rounded-xl p-6 flex flex-col bg-red-200 items-center">
      <div className="w-40 h-40 bg-gray-200 relative">
        <div className="w-full h-full rounded-full bg-blue-500"></div>
        <div className="w-11 h-11 rounded-full bg-green-3 absolute bottom-0 right-3 flex justify-center items-center cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M16.8103 6.05983L4.05422 18.8473L3.28125 20.7186L5.1525 19.9456L17.94 7.18952L16.8103 6.05983ZM19.3627 3.50795L18.81 4.06014L19.9397 5.18983L20.4923 4.63717C20.6374 4.49205 20.7188 4.29529 20.7188 4.09014C20.7188 3.88499 20.6374 3.68823 20.4923 3.54311L20.4572 3.50795C20.3853 3.43608 20.3 3.37907 20.2061 3.34017C20.1122 3.30127 20.0116 3.28125 19.9099 3.28125C19.8083 3.28125 19.7076 3.30127 19.6137 3.34017C19.5198 3.37907 19.4345 3.43608 19.3627 3.50795Z"
              stroke="white"
              stroke-width="2.0625"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <Image
              src="/icons/sidemenu_icon1.svg"
              width={24}
              height={24}
              alt="내정보아이콘"
              className="fill-white"
            />
            <div>내 정보</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
