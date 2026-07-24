type PromptChipProps = {
    title: string;
};

export default function PromptChip({
                                       title,
                                   }: PromptChipProps) {
    return (
        <button
            type="button"
            className="
        glass
        glow
        group
        rounded-full
        px-5
        py-3
        text-sm
        font-medium
        text-secondary
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:text-primary
        active:translate-y-0
      "
        >
      <span
          className="
          bg-gradient-to-r
          from-white
          via-zinc-200
          to-zinc-400
          bg-clip-text
          transition-all
          duration-300
          group-hover:text-transparent
        "
      >
        {title}
      </span>
        </button>
    );
}