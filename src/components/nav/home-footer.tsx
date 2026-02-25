import { LucideAlertTriangle, LucideInstagram, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { DictionaryType, LangType } from "@/content/dictionary";

interface HomeFooterProps {
  lang: LangType;
  dict: DictionaryType;
}

export default function HomeFooter({ lang, dict }: HomeFooterProps) {
  const footerDict = dict.homepage.footer;

  return (
    <div className={"bg-neutral-100"}>
      <div>
        <div
          className={
            "mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-5 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-16"
          }
        >
          <div
            className={"space-y-4 sm:col-span-2 lg:col-span-2 hidden lg:grid"}
          >
            <div className={"space-y-1"}>
              <Link href={`/${lang}`} className={"block w-fit"}>
                <Image
                  src={"/parkwize_logo_tr.png"}
                  alt={"Parkwize Logo"}
                  width={180}
                  height={48}
                  className={"h-10 w-auto object-contain"}
                />
              </Link>
              <p className={"text-sm font-light text-text-muted"}>
                {footerDict.tagline}
              </p>
              <div
                className={
                  "flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px] text-text-muted"
                }
              >
                <p className={""}>&copy; {new Date().getFullYear()}</p>
                <p>-</p>
                <Link href={"/privacy-policy"} className={"hover:underline"}>
                  {footerDict.privacyPolicy}
                </Link>
                <p>-</p>
                <Link href={"/terms-of-use"} className={"hover:underline"}>
                  {footerDict.termsOfUse}
                </Link>
              </div>
            </div>
            <div className={"h-px w-full bg-border-light"} />
            <div className={"flex flex-wrap items-center gap-4"}>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideInstagram className={"m-auto"} />
              </div>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideMail className={"m-auto"} />
              </div>
              <Link
                href={"https://status.parkwizeinc.com"}
                target={"_blank"}
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideAlertTriangle className={"m-auto"} />
              </Link>
              <div className={"flex items-center gap-x-1.5"}>
                <div className={"size-1 rounded-full bg-green-500"} />
                <p className={"text-xs text-green-600"}>{footerDict.systemStatus}</p>
              </div>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text uppercase"}>{footerDict.products.title}</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={`/${lang}/dashboard`} className={"w-fit"}>
                {footerDict.products.dashboard}
              </Link>
              <Link href={`/${lang}/display`} className={"w-fit"}>
                {footerDict.products.signage}
              </Link>
              <Link href={`/${lang}/booking`} className={"w-fit"}>
                {footerDict.products.booking}
              </Link>
              <Link href={`/${lang}/ai`} className={"w-fit"}>
                {footerDict.products.ai}
              </Link>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text uppercase"}>{footerDict.navigate.title}</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={`/${lang}#ecosystem`} className={"w-fit"}>
                {footerDict.navigate.ecosystem}
              </Link>
              <Link href={`/${lang}#products`} className={"w-fit"}>
                {footerDict.navigate.products}
              </Link>
              <Link href={`/${lang}#vision`} className={"w-fit"}>
                {footerDict.navigate.vision}
              </Link>
              <Link href={`/${lang}#early-access-form`} className={"w-fit"}>
                {footerDict.navigate.getInTouch}
              </Link>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text uppercase"}>{footerDict.actions.title}</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={`/${lang}#early-access-form`} className={"w-fit"}>
                {footerDict.actions.bookCall}
              </Link>
              <Link
                href={"https://demo.parkwizeinc.ai"}
                target={"_blank"}
                className={"w-fit"}
              >
                {footerDict.actions.exploreDemo}
              </Link>
              <Link href={"/sign-in"} className={"w-fit"}>
                {footerDict.actions.signIn}
              </Link>
            </div>
          </div>

          <div className={"space-y-4 sm:col-span-2 lg:col-span-2 lg:hidden"}>
            <div className={"space-y-1"}>
              <Link href={`/${lang}`} className={"block w-fit"}>
                <Image
                  src={"/parkwize_logo_tr.png"}
                  alt={"Parkwize Logo"}
                  width={180}
                  height={48}
                  className={"h-10 w-auto object-contain"}
                />
              </Link>
              <p className={"text-sm font-light text-text-muted"}>
                {footerDict.tagline}
              </p>
              <div
                className={
                  "flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px] text-text-muted"
                }
              >
                <p className={""}>&copy; {new Date().getFullYear()}</p>
                <p>-</p>
                <Link href={"/privacy-policy"} className={"hover:underline"}>
                  {footerDict.privacyPolicy}
                </Link>
                <p>-</p>
                <Link href={"/terms-of-use"} className={"hover:underline"}>
                  {footerDict.termsOfUse}
                </Link>
              </div>
            </div>
            <div className={"h-px w-full bg-border-light"} />
            <div className={"flex flex-wrap items-center gap-4"}>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideInstagram className={"m-auto"} />
              </div>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideMail className={"m-auto"} />
              </div>
              <Link
                href={"https://status.parkwizeinc.com"}
                target={"_blank"}
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideAlertTriangle className={"m-auto"} />
              </Link>
              <div className={"flex items-center gap-x-1.5"}>
                <div className={"size-1 rounded-full bg-green-500"} />
                <p className={"text-xs text-green-600"}>{footerDict.systemStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HomeFooter };
