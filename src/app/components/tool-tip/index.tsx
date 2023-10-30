import React from "react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Contribution } from "@/types"

const ToolTip = ({
    content,
    onClickToolTip
}: {
    content: Contribution
    onClickToolTip: (content: Contribution) => void
}) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button onClick={() => onClickToolTip(content)}>
                        <p
                            className={`rounded-sm p-1 h-[10px] w-[10px] cursor-pointer ${
                                content.is_active
                                    ? "bg-grid-green"
                                    : "bg-grid-gray"
                            }`}
                        ></p>
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                        <p className="p-4 py-[8px] rounded text-[12px] bg-secondary-blue text-white shadow-sm">
                            {content.desc}
                        </p>
                        <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export default ToolTip