import mixedGrill from "@/assets/dishes/mixed-grill.jpg?w=800&quality=75&format=webp";
import kebabHala from "@/assets/dishes/kebab-hala.jpg?w=800&quality=75&format=webp";
import lambRibs from "@/assets/dishes/lamb-ribs.jpg?w=800&quality=75&format=webp";
import grilledChicken from "@/assets/dishes/grilled-chicken.jpg?w=800&quality=75&format=webp";
import okraTagine from "@/assets/dishes/okra-tagine.jpg?w=800&quality=75&format=webp";
import lesanAsfour from "@/assets/dishes/lesan-asfour.jpg?w=800&quality=75&format=webp";
import chickenFreekeh from "@/assets/dishes/chicken-freekeh.jpg?w=800&quality=75&format=webp";
import lambVegetable from "@/assets/dishes/lamb-vegetable.jpg?w=800&quality=75&format=webp";
import koshary from "@/assets/dishes/koshary.jpg?w=800&quality=75&format=webp";
import kosharyLiver from "@/assets/dishes/koshary-liver.jpg?w=800&quality=75&format=webp";
import molokhiaRabbit from "@/assets/dishes/molokhia-rabbit.jpg?w=800&quality=75&format=webp";
import foulTaameya from "@/assets/dishes/foul-taameya.jpg?w=800&quality=75&format=webp";
import omAli from "@/assets/dishes/om-ali.jpg?w=800&quality=75&format=webp";
import rozBelaban from "@/assets/dishes/roz-belaban.jpg?w=800&quality=75&format=webp";
import kunafaMango from "@/assets/dishes/kunafa-mango.jpg?w=800&quality=75&format=webp";
import karak from "@/assets/dishes/karak.jpg?w=800&quality=75&format=webp";

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag?: string;
};

export type Category = {
  id: string;
  label: string;
  tagline: string;
  dishes: Dish[];
};

export const CATEGORIES: Category[] = [
  {
    id: "grills",
    label: "المشويات على الفحم",
    tagline: "نار هادئة · توابل بلدي · لحوم طازجة",
    dishes: [
      { id: "g1", name: "مشاوي مشكلة فاخرة", desc: "كباب لحم بلدي · كفتة · ريش · فراخ مشوية", price: 480, img: mixedGrill, tag: "الأكثر طلباً" },
      { id: "g2", name: "كباب حلة بلدي", desc: "لحم بقري مفروم بالتوابل المصرية الأصلية", price: 285, img: kebabHala },
      { id: "g3", name: "ريش ضأن مشوية", desc: "ريش ضأن صغير متبلة بزيت الزيتون والروزماري", price: 395, img: lambRibs, tag: "موصى به" },
      { id: "g4", name: "فراخ مشوية بالليمون", desc: "نصف فرخة بلدي متبلة بالليمون والثوم", price: 175, img: grilledChicken },
    ],
  },
  {
    id: "tagines",
    label: "الطواجن البلدي",
    tagline: "تطبخ على نار هادئة في الفخار",
    dishes: [
      { id: "t1", name: "طاجن بامية باللحمة", desc: "بامية بلدي مع لحم ضأن في صلصة الطماطم", price: 185, img: okraTagine, tag: "بيتي" },
      { id: "t2", name: "طاجن لسان عصفور", desc: "لسان عصفور بشوربة فراخ غنية", price: 145, img: lesanAsfour },
      { id: "t3", name: "طاجن فراخ بالفريك", desc: "فراخ بلدي مع فريك على البخار", price: 195, img: chickenFreekeh },
      { id: "t4", name: "طاجن خضار بالموزة", desc: "موزة ضأن مع خضار موسم في الفخار", price: 220, img: lambVegetable },
    ],
  },
  {
    id: "koshary",
    label: "الكشري والمأكولات الشعبية",
    tagline: "وصفات الجدّات بنكهة المدينة",
    dishes: [
      { id: "k1", name: "كشري المدينة", desc: "أرز · مكرونة · عدس · حمص · بصل مقرمش", price: 65, img: koshary, tag: "تقليدي" },
      { id: "k2", name: "كشري بالكبدة", desc: "كشري المدينة مع كبدة إسكندراني حارة", price: 110, img: kosharyLiver },
      { id: "k3", name: "ملوخية بالأرانب", desc: "ملوخية ناعمة مع أرانب مشوية وأرز معمر", price: 230, img: molokhiaRabbit },
      { id: "k4", name: "فول وطعمية صعيدي", desc: "فول مدمس بزيت الكتان · طعمية بلدي", price: 55, img: foulTaameya },
    ],
  },
  {
    id: "desserts",
    label: "الحلويات والمشروبات",
    tagline: "لمسة شرقية تختم التجربة",
    dishes: [
      { id: "d1", name: "أم علي بالمكسرات", desc: "ساخنة بفستق ولوز وقشطة طازجة", price: 95, img: omAli, tag: "حلو" },
      { id: "d2", name: "أرز بلبن صعيدي", desc: "أرز بلبن بقرفة وقشطة بلدي", price: 65, img: rozBelaban },
      { id: "d3", name: "كنافة بالمانجو", desc: "كنافة ناعمة بقشطة ومانجو صعيدي", price: 110, img: kunafaMango },
      { id: "d4", name: "كرك المدينة", desc: "شاي كرك بالهيل والزعفران", price: 35, img: karak },
    ],
  },
];

export const ALL_DISHES = CATEGORIES.flatMap((c) => c.dishes);
export const findDish = (id: string) => ALL_DISHES.find((d) => d.id === id);