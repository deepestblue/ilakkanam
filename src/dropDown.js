export const attachDropdown = ({
    input,
    container,
    getSuggestions,
    onSelect,
},) => {
    const AUTOCOMPLETE_MAX = 15;
    let currentSuggestions = [];
    let highlightIndex = -1;
    let isOpen = false;

    const closeDropdown = () => {
        isOpen = false;
        highlightIndex = -1;
        currentSuggestions = [];
        container.innerHTML = "";
        container.style.display = "none";
        input.removeAttribute("aria-activedescendant",);
    };

    const render = () => {
        container.innerHTML = "";
        if (! currentSuggestions.length) {
            closeDropdown();
            return;
        }

        currentSuggestions.forEach((value, index,) => {
            const option = document.createElement("div",);
            option.textContent = value;
            option.setAttribute("role", "option",);
            option.dataset.index = String(index,);
            option.id = `suggestion-${index}`;
            option.className = "suggestion";
            if (index === highlightIndex) {
                option.classList.add("highlighted",);
                input.setAttribute("aria-activedescendant", option.id,);
            }
            container.appendChild(option,);
        },);

        isOpen = true;
        container.style.display = "block";
        if (highlightIndex < 0) {
            input.removeAttribute("aria-activedescendant",);
        }
    };

    const update = () => {
        const prefix = input.value;
        if (! prefix.length) {
            closeDropdown();
            return;
        }

        currentSuggestions = getSuggestions(prefix,).slice(0, AUTOCOMPLETE_MAX,);
        highlightIndex = -1;
        render();
    };

    const handleKeyDown = e => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (! isOpen && input.value) {
                update();
            }
            if (! currentSuggestions.length) {
                return;
            }
            e.preventDefault();
            if (e.key === "ArrowDown") {
                highlightIndex = (highlightIndex + 1 + currentSuggestions.length) % currentSuggestions.length;
            } else {
                highlightIndex = (highlightIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
            }
            render();
            return;
        }

        if (e.key === "Enter") {
            if (isOpen && highlightIndex >= 0 && highlightIndex < currentSuggestions.length) {
                e.preventDefault();
                const value = currentSuggestions[highlightIndex];
                onSelect(value,);
                closeDropdown();
            }
            return;
        }

        if (e.key === "Escape" && isOpen) {
            e.preventDefault();
            closeDropdown();
        }
    };

    const handleInputOrFocus = () => {
        update();
    };

    const handleMouseDown = e => {
        const target = e.target.closest("[data-index]",);
        if (! target) {
            return;
        }
        e.preventDefault();
        const index = Number(target.dataset.index,);
        if (Number.isNaN(index,) || index < 0 || index >= currentSuggestions.length) {
            return;
        }
        const value = currentSuggestions[index];
        onSelect(value,);
        closeDropdown();
    };

    input.addEventListener("keydown", handleKeyDown,);
    input.addEventListener("input", handleInputOrFocus,);
    input.addEventListener("focus", handleInputOrFocus,);
    container.addEventListener("mousedown", handleMouseDown,);

    container.style.display = "none";
    container.setAttribute("role", "listbox",);

    return {
        close: closeDropdown,
        update,
    };
};
