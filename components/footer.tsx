import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-[#1A3A60] bg-[#071428] py-12">
      <div className="mx-auto max-w-6xl px-6 h-90 w-auto">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 -ml-20">
            <Image
              src="/images/solarshield_logo.png"
              alt="SolarShield Logo"
              width={3000}
              height={3000}
              className="h-60 w-auto"
            />
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#6B8AB5] transition-colors hover:text-[#B8C9DE]">
              About
            </a>
            <a href="#" className="text-sm text-[#6B8AB5] transition-colors hover:text-[#B8C9DE]">
              Privacy
            </a>
            <a href="#" className="text-sm text-[#6B8AB5] transition-colors hover:text-[#B8C9DE]">
              Terms
            </a>
            <a href="#" className="text-sm text-[#6B8AB5] transition-colors hover:text-[#B8C9DE]">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1A3A60] pt-6 text-center">
          <p className="text-xs text-[#4A6A8A]">
            {'2026 SolarShield. All rights reserved. Empowering homeowners with clean energy.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
