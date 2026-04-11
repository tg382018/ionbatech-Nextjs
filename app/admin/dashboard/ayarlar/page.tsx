export default function AdminAyarlarPage() {
  return (
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <header className="border-b border-stone-200/90 pb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900">
          Ayarlar
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Panel ayarları burada yapılandırılacak.
        </p>
      </header>
      <div className="mt-8 flex flex-1 items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white/60 py-24 text-center text-sm text-stone-400">
        Henüz ayar yok.
      </div>
    </div>
  );
}
