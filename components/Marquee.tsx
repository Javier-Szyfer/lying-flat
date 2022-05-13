import Marquee from "react-double-marquee";

export default function MarqueeText() {
  return (
    <div
      style={{
        width: "100vw",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        backgroundColor: "#c1c1c1",
        color: "white",
      }}
      className="fixed left-0 bottom-16 mx-auto border-t border-stone-200 z-50"
    >
      <Marquee>
        Tang ping (Chinese: 躺平; pinyin: tǎng píng; lit. &apos;lying
        flat&apos;) is a lifestyle and social protest movement in China
        beginning in April 2021. It is a rejection of societal pressures to
        overwork, such as in the 996 working hour system, which is often
        regarded as a rat race with ever diminishing returns. Those who
        participate in tang ping instead choose to &quot;lie down flat and get
        over the beatings&quot; via a low-desire, more indifferent attitude
        towards life. Novelist Liao Zenghu described &quot;lying flat&quot; as a
        resistance movement, and The New York Times called it part of a nascent
        Chinese counterculture. It has also been compared to the Great
        Resignation, a surge of resignations that began in the United States and
        much of the Western world at roughly the same time. The National
        Language Resources Monitoring and Research Center, an institution
        affiliated to Education Ministry of China, listed the word as one of the
        10 most popular memes for 2021 in Chinese Internet. Chinese search
        engine Sogou also listed the word at the top of its list of most
        trending memes for 2021.[10] Unlike the hikikomori in Japan who are
        socially withdrawn, these young Chinese people who subscribe to
        &quot;lying flat&quot; are not necessarily socially isolated, but merely
        choose to lower their professional and economic ambitions and simplify
        their goals, still being fiscally productive for their own essential
        needs, and prioritize psychological health over economic materialism.
      </Marquee>
    </div>
  );
}
