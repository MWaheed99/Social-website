
const focusRing =
  'outline-hidden focus-visible:ring-4 focus-visible:ring-[#E6B450]/50 cursor-pointer';

export default function ProfileHeader({ProfileData}:{ProfileData:any}) {
  

  return (
    <header className="overflow-hidden w-[94%] sm:w-[90%] mx-auto mt-4 sm:mt-10 rounded-2xl bg-white shadow-[0_1px_2px_rgba(14,18,38,.05),0_10px_30px_rgba(14,18,38,.06)] mb-6">
      {/* Cover */}
      <div className="relative h-40 overflow-hidden bg-[#0E1226] sm:h-60">
        <span className="absolute -top-24 -right-6 size-64 rounded-full bg-[#E6B450] sm:right-20 sm:size-72" />
        <span className="absolute top-24 right-40 hidden size-40 rounded-full bg-[#2A3270] sm:block" />
        <span className="absolute top-12 -left-16 size-52 rounded-full bg-[#1B2250]" />
        <button
          type="button"
          
          className={`absolute right-4 bottom-4 flex h-11 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-bold text-white hover:bg-white/25 sm:right-6 sm:bottom-5 ${focusRing}`}
        >
          <i className="fa-solid fa-camera" aria-hidden="true" />
          <span className="hidden sm:inline">Edit cover</span>
        </button>
      </div>

      {/* Identity */}
      <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:gap-5 lg:gap-7 sm:text-left">
          <img src={ProfileData.photo} className="bg-secondary h-24 w-24 shrink-0 rounded-full object-cover sm:h-32 sm:w-32 lg:h-40 lg:w-40" alt="" />

          <div className="min-w-0 flex-1 sm:py-5">
            <h1 className="text-2xl font-bold tracking-tight text-[#141A2B] wrap-break-word sm:text-3xl lg:text-[34px]">{ProfileData.name}</h1>
            <p className="mt-0.5 text-[15px] text-[#566078] break-all">{ProfileData.username}</p>
            {/* <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#141A2B] sm:mx-0">bioo</p> */}
          </div>

          <div className="flex w-full gap-3 sm:w-auto sm:py-5">
            <button
              type="button"
              className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0E1226] px-4 text-sm font-bold text-white hover:bg-[#1B2250] sm:flex-none sm:px-6 sm:text-[15px] ${focusRing}`}
            >
              <i className="fa-solid fa-pen" aria-hidden="true" />
              Edit profile
            </button>
            <button
              type="button"
              className={`h-12 flex-1 rounded-full border border-[#D7DBEA] bg-white px-4 text-sm font-bold text-[#0E1226] hover:bg-[#EEF0F7] sm:flex-none sm:px-6 sm:text-[15px] ${focusRing}`}
            >
              Share profile
            </button>
          </div>
        </div>

        {/* <dl className="mt-5 flex justify-center gap-8 sm:justify-start sm:gap-12">
          {statItems.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <dd className="text-2xl font-bold text-[#141A2B]">{value}</dd>
              <dt className="text-sm text-[#566078]">{label}</dt>
            </div>
          ))}
        </dl> */}
      </div>
    </header>
  );
}