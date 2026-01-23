import { cn } from "@/lib/utils";

interface RankingItem {
  id: string;
  rank: number;
  name: string;
  goal: string;
  totalHours: string;
  dailyAverage: string;
  career: string;
  stacks: string[];
}

interface RankingListProps {
  items?: RankingItem[];
  className?: string;
}

const defaultItems: RankingItem[] = [
  {
    id: "rank-1",
    rank: 1,
    name: "CoffeeScripted",
    goal: "Build a calmer, faster developer routine.",
    totalHours: "420h",
    dailyAverage: "4.5h",
    career: "4-7 years",
    stacks: ["Item", "Item", "Item", "Item", "Item"],
  },
  {
    id: "rank-4",
    rank: 4,
    name: "CoffeeScripted",
    goal: "Keep shipping without losing focus.",
    totalHours: "420h",
    dailyAverage: "4.5h",
    career: "0-3 years",
    stacks: ["Item", "Item", "Item", "Item", "Item"],
  },
  {
    id: "rank-9999",
    rank: 9999,
    name: "CoffeeScripted",
    goal: "Stay consistent, not perfect.",
    totalHours: "420h",
    dailyAverage: "4.5h",
    career: "11+ years",
    stacks: ["Item", "Item", "Item", "Item", "Item"],
  },
];

const getRankStyle = (rank: number) => {
  if (rank <= 3) {
    return { badge: "bg-[#4C79FF] text-white", text: "text-[#4C79FF]" };
  }
  if (rank <= 10) {
    return { badge: "bg-[rgba(76,121,255,0.1)] text-[#4C79FF]", text: "text-[#4C79FF]" };
  }
  return { badge: "bg-[#F0F2F5] text-[#717887]", text: "text-[#4C79FF]" };
};

const getOrdinalSuffix = (rank: number) => {
  const mod10 = rank % 10;
  const mod100 = rank % 100;

  if (mod10 === 1 && mod100 !== 11) return "st";
  if (mod10 === 2 && mod100 !== 12) return "nd";
  if (mod10 === 3 && mod100 !== 13) return "rd";
  return "th";
};

const RankRow = ({ item }: { item: RankingItem }) => {
  const styles = getRankStyle(item.rank);
  const rankLabel = item.rank >= 1000 ? item.rank.toLocaleString("en-US") : `${item.rank}`;
  const rankSuffix = getOrdinalSuffix(item.rank);

  return (
    <div className="flex w-full min-h-[150px] items-start gap-9 rounded-[12px] bg-white px-6 py-3">
      <div className="flex flex-col items-start gap-4 w-[90px]">
        <div className={cn("rounded-[8px] px-2 py-1 fontSize-title-b", styles.badge)}>
          {rankLabel}
          {rankSuffix}
        </div>
        <div className="w-20 h-20 rounded-full bg-[radial-gradient(circle_at_30%_30%,#D8E2FF,#B3C5FF)] border border-[#E5E7EB]" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className={cn("fontSize-title-b", styles.text)}>{item.name}</div>
          <div className={cn("fontSize-body-m", styles.text)}>{item.goal}</div>
        </div>
        <div className="flex items-center gap-6 fontSize-body-m text-[#717887]">
          <div className="flex items-center gap-2">
            <span>Total</span>
            <span className="fontSize-body-s text-[#394252]">{item.totalHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Daily Avg</span>
            <span className="fontSize-body-s text-[#394252]">{item.dailyAverage}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Career</span>
            <span className="fontSize-body-s text-[#394252]">{item.career}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.stacks.map((stack, index) => (
            <div
              key={`${item.id}-stack-${index}`}
              className="rounded-[5px] bg-[#F0F2F5] px-2 py-1 fontSize-body-m text-[#717887]"
            >
              {stack}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RankingList = ({ items = defaultItems, className }: RankingListProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[1240px] min-h-[522px] rounded-[5px] p-5 flex flex-col gap-4",
        className
      )}
    >
      {items.map((item) => (
        <RankRow key={item.id} item={item} />
      ))}
    </div>
  );
};
