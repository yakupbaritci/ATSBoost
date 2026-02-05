// Language Levels
const languageLevels = [
    "Native",
    "Fluent",
    "Advanced (C1-C2)",
    "Intermediate (B1-B2)",
    "Beginner (A1-A2)"
]

// Level Selector Component
const LevelSelector = ({ value, onChange }: { value?: string, onChange: (val: string) => void }) => {
    // Smart mapping for incoming values
    const mapLevel = (val?: string) => {
        if (!val) return undefined;
        const v = val.toLowerCase();
        if (v.includes('native') || v.includes('mother') || v.includes('ana')) return "Native";
        if (v.includes('fluent') || v.includes('akıcı')) return "Fluent";
        if (v.includes('advanced') || v.includes('ileri') || v.includes('c1') || v.includes('c2')) return "Advanced (C1-C2)";
        if (v.includes('intermediate') || v.includes('orta') || v.includes('b1') || v.includes('b2')) return "Intermediate (B1-B2)";
        if (v.includes('beginner') || v.includes('başlangıç') || v.includes('a1') || v.includes('a2')) return "Beginner (A1-A2)";
        return undefined; // If no match, we might show a custom input or just let them pick
    }

    const selectedLevel = languageLevels.includes(value || '') ? value : mapLevel(value);

    return (
        <Select value={selectedLevel} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
                {languageLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
        </Select>
    )
} 
