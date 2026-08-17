import { images } from '../../data/images.js';

export default function SupportGraphic() {
  return (
    <img
      src={images.contactHelp}
      alt="Support team helping Canadian tech talent"
      className="h-64 w-full rounded-xl object-cover object-center md:h-80"
    />
  );
}
