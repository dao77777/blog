import Image from "next/image"
import { useRouter } from "next/router"
import faviconUrl from './public/favicon.svg'

const metaJson = {
  "test": {
    "title": "Nextra",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true,
    "display": "hidden",
    "type": "page/menu",
    "items": {
      // ...test
    },
    "theme": {
      "breadcrumb": false,
      "footer": true,
      "sidebar": false,
      "toc": true,
      "pagination": false,
      "layout": "default/raw/full",
      "typesetting": "default/article"
    }
  },
  "*": {
    "type": "page"
  },
  "---": {
    "type": "separator"
  },
}


export default {
  // Global
  docsRepositoryBase: 'https://github.com/dao77777/blog/tree/master/pages',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Dao77777\'s Blog'
      }
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Dao77777's Blog" />
      <meta property="og:description" content="The next site builder" />
      {/* favicon */}
      <link rel="icon" href="/favicon.svg" />
    </>
  ),
  // darkMode
  // nextThemes
  // primaryHue

  // NavBar
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 10 }}>
      <Image src={faviconUrl} width={40} height={40}></Image>
      <span>Dao77777's Blog</span>
    </div>
  ),
  // logoLink
  project: {
    link: 'https://github.com/dao77777/blog',
    // icon
  },
  chat: {
    link: 'https://github.com/dao77777/blog',
    // icon
  },
  banner: {
    dismissible: true,
    key: '1.0-release',
    text: (
      <a href="https://github.com/dao77777/blog" target="_blank">
        Everything will be better in 2023 🎉
      </a>
    ),
  },
  search: {
    // component
    // emptyResult
    // loading
    // error
    // placeholder
  },
  navbar: {
    // component: (
    //   <div>component</div>
    // ),
    // extraContent: (
    //   <div>extraContent</div>
    // )
  },

  // SideBar
  sidebar: {
    defaultMenuCollapseLevel: 2,
    // titleComponent({ title, type }) {
    //   if (type === 'separator') {
    //     return (
    //       <div style={{ background: 'cyan', textAlign: 'center' }}>{title}</div>
    //     )
    //   }
    //   if (title === 'About') {
    //     return <>❓ {title}</>
    //   }
    //   return <>👉 {title}</>
    // },
    toggleButton: true,
  },

  // TOC SideBar
  toc: {
    // component
    // extraContent
    float: true,
    // title
  },
  feedback: {
    // content
    // labels
    // useLink
  },
  editLink: {
    // text
    // component
  }

  // Content
  // components
  // direction
  // main

  // End of Page
  // navigation: { prev: true, next: true },
  // gitTimestamp: () => {}, // lastUpdate

  // Footer
  // footer: {
  //   text: <span>
  //     MIT {new Date().getFullYear()} © <a href="https://nextra.site" target="_blank">Nextra</a>.
  //   </span>,
  //   component: ({ menu: boolean }) => {

  //   }
  // },
}