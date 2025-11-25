export function OpenPeopleFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/30">
        <p>Snow White Laundry</p>
        <p className="text-white/20">
          Powered by{" "}
          <a
            href="https://openpeople.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 transition-colors"
          >
            Open People
          </a>
        </p>
      </div>
    </footer>
  );
}
