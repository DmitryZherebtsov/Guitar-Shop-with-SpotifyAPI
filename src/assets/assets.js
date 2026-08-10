
import logo from "../assets/logo.svg"
import cart from "../assets/cart.svg"
import burger from "../assets/burger.svg"
import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import youtube from "../assets/youtube.svg"
import img_intro from "../assets/img-intro.png"
import img_intro2 from "../assets/img-intro2.png"
import check from "../assets/check.svg"
import decorador from "../assets/decorador.svg"

import gibson1 from "../assets/gibson-1.png"
import gibson2 from "../assets/gibson-2.png"
import gibson3 from "../assets/gibson-3.png"
import gibson4 from "../assets/gibson-4.png"
import gibson5 from "../assets/gibson-5.png"
import gibson6 from "../assets/gibson-6.png"

import gibson1collect from "../assets/gibson-collection-1.png"
import gibson2collect from "../assets/gibson-collection-2.png"
import gibson3collect from "../assets/gibson-collection-3.png"
import gibson4collect from "../assets/gibson-collection-4.png"
import gibson5collect from "../assets/gibson-collection-5.png"
import gibson6collect from "../assets/gibson-collection-6.png"

import sponsor1 from "../assets/sponsor-1.svg"
import sponsor2 from "../assets/sponsor-2.svg"
import sponsor3 from "../assets/sponsor-3.svg"
import sponsor4 from "../assets/sponsor-4.svg"
import sponsor5 from "../assets/sponsor-5.svg"

import cesar from "../assets/founderCesar.jpg"

export const nav_assets = {
    logo,
    cart,
    burger,
    facebook,
    instagram,
    youtube,
    img_intro,
    img_intro2,
    check,
    decorador,
    cesar
}

export const sponsors = [
    {
        image: sponsor1
    },
    {
        image: sponsor2
    },
    {
        image: sponsor3
    },
    {
        image: sponsor4
    },
    {
        image: sponsor5
    },
]

export const guitars =  [
    {
        id: "1",
        image: gibson1,
        collection: gibson1collect,
        title: "Gibson Custom Shop PSL ’68",
        price: 9999,
        price_text: "9.999,99",
        description: "This guitar refines the best of American craftsmanship and incredible legacy of the Gibson 30 over the last few decades. Ideal for a Heavy sound.",
        additional: `Mahogany body
         2 tone controls 
         Ebony fingerboard 
         2 volume controls`,
        genres: ["metal", "hard rock", "rock"]
    },
    {
        id: "2",
        image: gibson2,
        collection: gibson2collect,
        title: "Gibson Custom Shop Koa Antique 9.4",
        price: 15999,
        price_text: "15.999,99",
        description: "The instrument has a vintage appearance and represents a perfect combination of style with powerful sound.",
        additional: `Nitrocellulose finish
         Mother-of-pearl block embedded in the fingerboard 
         Stoptail Bridge/Tailpiece 2.68 
         Custom pickups`,
        genres: ["blues", "jazz", "classic rock"]
    },
    {
        id: "3",
        image: gibson3,
        collection: gibson3collect,
        title: "ESP LTD EC-1000",
        price: 5999,
        price_text: " 5.999,99",
        description: "The EC-1000 Series guitars are designed to deliver the tone, feel, look and quality that professional musicians need in an instrument.",
        additional: `24 stainless 
        Steel frets
        Old hardware
        Lock tuners LTD`,
        genres: ["metal", "metalcore", "hard rock"]
    },
    {
        id: "4",
        image: gibson4,
        collection: gibson4collect,
        title: "Gibson Custom Shop Ebony 2018 ",
        price: 7999,
        price_text: "7.999,99",
        description: "This Les Paul has impressive versatility. It adapts easily to any musical genre and offers a feeling of confidence and security to perform any technique.",
        additional: `Original Gibson pickups 
        Original finish
        Ebony fingerboard 
         Original hardware`,
        genres: ["rock", "pop", "blues", "metal"]
    },
    {
        id: "5",
        image: gibson5,
        collection: gibson5collect,
        title: "Epiphone Alpine White",
        price: 11999,
        price_text: "11.999,99",
        description: "It is part of Epiphone's Inspired by Gibson collection and pays homage to classic models from the 1950s.",
        additional: `Bridge in gold 
         Pair of Epiphone ProBucker humbuckers 
         2 volume controls 
         2 tone controls`,
        genres: ["rock and roll", "classic rock", "pop"]
    },
    {
        id: "6",
        image: gibson6,
        collection: gibson6collect,
        title: "Tokai Custom UALC70 WR",
        price: 4999,
        price_text: "4.999,99",
        description: "One of the most sought after classical guitars. It offers sophistication and quality for guitarists looking for a great Les Paul at a more affordable price.",
        additional: `Stopover at Rosewood
        LS-VBC Tune-o-Matic
        Bridge Gold hardware 2 
        LSC-F humbucker pickups`,
        genres: ["folk", "classic rock", "pop"]
    }
]
