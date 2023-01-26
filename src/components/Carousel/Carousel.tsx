import * as React from "react"
import NextImage from "next/image"
import { Heading, Text } from "@/ui"
export const Carousel = () => {
  /************************************
1. If you want to add or remove items you will need to change a variable called $slide-count in the CSS *minimum 3 slides

2. if you want to change the dimensions of the slides you will need to edit the slideWidth variable here 👇 and the $slide-width variable in the CSS.
************************************/
  const slideWidth = 30

  const _items = [
    {
      player: {
        title: "Efren Reyes",
        desc: 'Known as "The Magician", Efren Reyes is well regarded by many professionals as the greatest all around player of all time.',
        image: "https://i.postimg.cc/RhYnBf5m/er-slider.jpg",
      },
    },
    {
      player: {
        title: "Ronnie O'Sullivan",
        desc: "Ronald Antonio O'Sullivan is a six-time world champion and is the most successful player in the history of snooker.",
        image: "https://i.postimg.cc/qBGQNc37/ro-slider.jpg",
      },
    },
    {
      player: {
        title: "Shane Van Boening",
        desc: 'The "South Dakota Kid" is hearing-impaired and uses a hearing aid, but it has not limited his ability.',
        image: "https://i.postimg.cc/cHdMJQKG/svb-slider.jpg",
      },
    },
    {
      player: {
        title: "Mike Sigel",
        desc: 'Mike Sigel or "Captain Hook" as many like to call him is an American professional pool player with over 108 tournament wins.',
        image: "https://i.postimg.cc/C12h7nZn/ms-1.jpg",
      },
    },
    {
      player: {
        title: "Willie Mosconi",
        desc: 'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
        image: "https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg",
      },
    },
  ]

  const length = _items.length
  _items.push(..._items)

  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const createItem: any = (position: any, idx: any) => {
    const item: any = {
      styles: {
        transform: `translateX(${position * slideWidth}rem)`,
      },
      player: _items[idx].player,
    }

    switch (position) {
      case length - 1:
      case length + 1:
        item.styles = { ...item.styles, filter: "grayscale(1)" }
        break
      case length:
        break
      default:
        item.styles = { ...item.styles, opacity: 0 }
        break
    }

    return item
  }

  const CarouselSlideItem: any = ({ pos, idx, activeIdx }: any) => {
    const item = createItem(pos, idx, activeIdx)

    return (
      <li
        className={`carousel__slide-item inline-block m-0 p-4 absolute h-[${slideWidth}] transition w-[${slideWidth}] `}
        style={item.styles}
      >
        <div className="carousel__slide-item-img-link flex h-full overflow-hidden relative w-full cursor-zoom-in after:items-center after:text-white after:flex after:h-full after:justify-center after:opacity-0 after:absolute after:w-full after:bg-[rgba(black,0.5)] after:transition after:content-[read_more] hover:after:opacity-100">
          <NextImage
            className="h-full object-cover w-full transition hover:scale-[1.3]"
            src={item.player.image}
            alt={item.player.title}
            width={100}
            height={100}
          />
        </div>
        <div className="carousel-slide-item__body absolute bottom-[-2.5rem] h-[10%]">
          <Heading as="h4" className="uppercase mt-2">
            {item.player.title}
          </Heading>
          <Text>{item.player.desc}</Text>
        </div>
      </li>
    )
  }

  const keys = Array.from(Array(_items.length).keys())

  const Carousel = () => {
    const [items, setItems] = React.useState(keys)
    const [isTicking, setIsTicking] = React.useState(false)
    const [activeIdx, setActiveIdx] = React.useState(0)
    const bigLength = items.length

    const prevClick = (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true)
        setItems((prev) => {
          return prev.map((_, i) => prev[(i + jump) % bigLength])
        })
      }
    }

    const nextClick = (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true)
        setItems((prev) => {
          return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength])
        })
      }
    }

    const handleDotClick = (idx: any) => {
      if (idx < activeIdx) prevClick(activeIdx - idx)
      if (idx > activeIdx) nextClick(idx - activeIdx)
    }

    React.useEffect(() => {
      if (isTicking) sleep(300).then(() => setIsTicking(false))
    }, [isTicking])

    React.useEffect(() => {
      setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items])

    return (
      <div className="carousel__wrap items-center flex justify-center relative w-4/5 mt-[10%] flex-1 left-[50%] -translate-x-2/4	">
        <div
          className={`carousel__inner h-64 relative w-[calc(#${slideWidth} * 3])`}
        >
          <button
            className="carousel__btn carousel__btn items-center cursor-pointer flex justify-center absolute top-[50%] -translate-y-1/2 left-[-10rem] carousel__btn--prev"
            onClick={() => prevClick()}
          >
            <i className="carousel__btn-arrow h-24 p-1 w-24 z-10 rotate-[135deg] carousel__btn-arrow--left" />
          </button>
          <div className="carousel__container h-full overflow-hidden relative w-full">
            <ul
              className={`carousel__slide-list h-full list-none m-0 p-0 absolute left-[50%] w-[calc(#(${length} + 0.5)* ${slideWidth} * 2]`}
            >
              {items.map((pos, i) => (
                <CarouselSlideItem
                  key={i}
                  idx={i}
                  pos={pos}
                  activeIdx={activeIdx}
                />
              ))}
            </ul>
          </div>
          <button
            className="carousel__btn items-center cursor-pointer flex justify-center absolute top-[50%] -translate-y-1/2	right-[-10rem] carousel__btn--next"
            onClick={() => nextClick()}
          >
            <i className="carousel__btn-arrow h-24 p-1 w-24 z-10 rotate-[-45deg] carousel__btn-arrow--right" />
          </button>
          <div className="carousel__dots inline-block mt-8 absolute left-[50%] -translate-x-2/4">
            {items.slice(0, length).map((pos, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`cursor-pointer h-8 w-8 scale-[0.5] ${
                  i === activeIdx ? "dot active" : "dot "
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Carousel />
    </>
  )
}
