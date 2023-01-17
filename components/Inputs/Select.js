import { useState, uesEffet, useEffect, useRef } from 'react';
import styles from './Select.module.css';

function defaultValidate (chips) {
    return chips?.length;
}

function isVisible (ele, container) {
    if (!container) container = ele.parentElement;

    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    return (
        (eleTop >= containerTop && eleBottom <= containerBottom) ||
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
    );
}

function scrollParentToChild (child, parent) {
    if (!parent) parent = child.parentElement;
    let parentRect = parent.getBoundingClientRect();
    let parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
    };
    
    let childRect = child.getBoundingClientRect();
    let isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);
    
    if (!isViewable) {
        const scrollTop = childRect.top - parentRect.top;
        const scrollBot = childRect.bottom - parentRect.bottom;
        if (Math.abs(scrollTop) < Math.abs(scrollBot)) parent.scrollTop += scrollTop;
        else parent.scrollTop += scrollBot;
    }
}
    
const modify = str => str.toLowerCase().split('').filter(a => `abcdefghijklmnopqrstuvwxyz1234567890`.includes(a)).join('') ?? '';

function looseMatch (str1, str2) {
    return modify(str1) == modify(str2);
}

export function Chip ({ chipData: chip, forceUpdate, chips, setChips, multiSelect, presetChips, localData, isCustom, isSelected, resetSelected, selectThisChip, setActiveColor, setLocalData, startEdits }) {
    const selfRef = useRef(null);

    useEffect(() => {
        if (!isVisible(selfRef.current)) {
            scrollParentToChild(selfRef.current);
        }
        window.looseMatch = looseMatch;
    }, [isSelected]);

    return (
        <div onMouseMove={selectThisChip} ref={selfRef} className={[styles.chipOption, isSelected ? styles.selectedChip : ''].join(' ')} onMouseDown={e => e.preventDefault()} onMouseUp={e => {
            if (isCustom) {
                e.preventDefault();
                resetSelected(0);
                let theseChips = JSON.parse(JSON.stringify(chips));
                theseChips.push({
                    name: localData,
                    color: chip.color,
                    id: Math.floor(Math.random() * 10000) + '-' + Date.now()
                });
                setChips(theseChips);
                setActiveColor(Math.random() * 6 | 0);
                setLocalData('');
                forceUpdate();
                startEdits();
            } else {
                e.preventDefault();
                resetSelected(0);
                let index = 0;
                presetChips.forEach((c, i) => (c.name == chip.name ? index = i : 0));
                let thesePresetChips = JSON.parse(JSON.stringify(presetChips));
                let theseChips = chips;
                let thisChip = thesePresetChips.splice(index, 1)[0];
                if (multiSelect) theseChips.push({
                    name: thisChip.name,
                    color: thisChip.color,
                    id: Math.floor(Math.random() * 10000) + '-' + Date.now()
                });
                else theseChips = [
                    {
                        name: thisChip.name,
                        color: thisChip.color,
                        id: Math.floor(Math.random() * 10000) + '-' + Date.now()
                    }
                ];
                setChips(theseChips);
                forceUpdate();
                startEdits();
                setLocalData('');
            }
        }}>
            {isCustom && 'Add '} <span data-color={chip.color} className={styles.chip} key={Math.floor(Math.random() * 10000) + '-' + Date.now()}>{chip.name} <span className={styles.close}>×</span></span>
        </div>
    );
}

export default function Select (props) {
    const { setValue, multi, options = [], special, validate: _validate, name, description, help, placeholder, data, setData, initialData, wrapperClass, width, margin, type, id: _id, required, dontDisplayAll } = props;

    const displayAll = !dontDisplayAll;

    const [selected, setSelected] = useState(0);

    const id = _id ?? name?.toLowerCase()?.split(' ')?.join('-')?.split('')?.filter(a => `abcdefghijklmnopqrstuvwxyz1234567890-_`.includes(a))?.join('') ?? 'error';
    const validate = data => (_validate ?? defaultValidate)() && (required ? data?.length : true);

    const [localData, setLocalData] = useState(initialData ?? '');
    const [valid, setValid] = useState(false);
    const [partiallyValid, setPartiallyValid] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const custom = options.filter(opt => opt?.custom).length > 0;
    const multiSelect = multi;

    const presetChips = options.filter(opt => !opt?.custom).map((opt, i) => ({
        name: opt,
        color: i % 7,
    }));

    const [displayedPresetChips, setDisplayedPresetChips] = useState(presetChips);

    const [chips, setChips] = useState([
    ]);

    useEffect(() => {
        setValue(name, chips.map(c => c.name));
    }, [chips]);

    const [activeColor, setActiveColor] = useState(0);

    const [counter, setCounter] = useState(Math.random() * 6 | 0);

    useEffect(() => {
        let excluded = presetChips.filter(presetChip => !chips.map(chip => chip.name).includes(presetChip.name));
        if (localData?.length) {
            setDisplayedPresetChips(
                excluded.filter(chip => (
                    modify(chip.name).includes(modify(localData))
                    || !modify(localData).split('').filter((a, i) => chip.name.toLowerCase().split(' ')[i]?.[0] !== a).length
                ))
            );
        } else {
            setDisplayedPresetChips(excluded);
        }
    }, [chips, localData, counter]);

    function forceUpdate () {
        setCounter(counter + 1);
    }

    const [editing, setEditing] = useState(false);

    function startEdits () {
        setEditing(true);
    }

    function finishEdits () {
        setEditing(false);
    }

    function resetSelected () {
        setSelected(0);
    }

    useEffect(() => {
        let validationStatus = validate(chips);
        setValid(!editing && validationStatus);
        setPartiallyValid(editing && validationStatus);
    }, [chips, editing, counter]);

    const displayedChips = [
        ...(displayedPresetChips.filter(chip => looseMatch(chip.name, localData))[0] ? [displayedPresetChips.filter(chip => looseMatch(chip.name, localData))[0]] : []).map(chip => ({ chip })),
        ...displayedPresetChips.filter(chip => !looseMatch(chip.name, localData)).map(chip => ({ chip })),
        ...((localData?.length && custom) ? [{
            name: localData?.trim(),
            color: activeColor
        }] : []).map(chip => ({ chip, isCustom: true }))
    ];

    return (
        <>
            <div className={[wrapperClass, styles.wrapper, valid && styles.isValid, partiallyValid && !valid && styles.isPartiallyValid].filter(l => l).join(' ')} style={{
                width: width ?? '300px',
                margin: margin ?? '0px',
                boxSizing: 'border-box'
            }}>
                <label for={id}>{name} {required && <b style={{ color: 'red', fontWeight: 500 }}>*</b>} {help && <span><span aria-label={help} tabIndex={0}>?</span></span>}</label>
                <p>{description}</p>
                <div className={styles.content} onFocus={startEdits} onBlur={finishEdits} onClick={e => (e.preventDefault(), inputRef.current.focus(), dropdownRef.current.scrollTop = 0, startEdits(), setSelected(0))} tabIndex={-1} onKeyDown={e => {
                    if (e.key == 'ArrowDown') {
                        setSelected((selected + 1 + displayedChips.length) % displayedChips.length);
                    } else if (e.key == 'ArrowUp') {
                        setSelected((selected - 1 + displayedChips.length) % displayedChips.length);
                    }
                }}>
                    {chips.map(chip => (
                        <span onMouseDown={e => e.preventDefault()} data-color={chip.color} className={styles.chip} key={chip.id + chip.name + chip.color}>{chip.name} <span className={styles.close} onClick={e => {
                            let index = 0;
                            chips.forEach((c, i) => (c.id == chip.id ? index = i : 0));
                            let theseChips = JSON.parse(JSON.stringify(chips));
                            theseChips.splice(index, 1);
                            setChips(theseChips);
                        }}>×</span></span>
                    ))}
                    <input placeholder={chips?.length == 0 ? (placeholder ?? 'Select') : ''} onChange={e => {
                        setLocalData(e.target.value);
                        setSelected(0);
                        if (setData instanceof Function) setData(e.target.value);
                    }} onKeyDown={e => {
                        if (e.key == 'Backspace' && e.target.value?.length == 0) {
                            let theseChips = JSON.parse(JSON.stringify(chips));
                            theseChips.pop();
                            startEdits();
                            setChips(theseChips);
                        } else if ((e.key == 'Enter' || e.key == ',')) {
                            let activeChip = displayedChips[selected]?.chip;
                            if (!activeChip) return;
                            if (e.key == ',') e.preventDefault();
                            let theseChips = JSON.parse(JSON.stringify(chips));
                            if (!displayedPresetChips.length && !custom) return;
                            if (multiSelect) theseChips.push({
                                name: activeChip.name,
                                color: activeChip.color,
                                id: localData.toLowerCase().split(' ').join('-')
                            });
                            else theseChips = [
                                {
                                    name: activeChip.name,
                                    color: activeChip.color,
                                    id: localData.toLowerCase().split(' ').join('-')
                                }
                            ];
                            setActiveColor(Math.random() * 6 | 0);
                            setChips(theseChips);
                            e.target.value = '';
                            setLocalData('');
                            startEdits();
                            resetSelected();
                            if (setData instanceof Function) setData('');
                        }
                    }}
                    name={id} id={id} type={type} ref={inputRef} value={localData}></input>
                </div>
                <span>✓</span>
                <div className={styles.dropdown} ref={dropdownRef} tabIndex="-1" onFocus={() => inputRef.current.focus()} onMouseDown={startEdits}>
                    {displayAll ? displayedChips.map(({ chip, isCustom }, i) => <Chip chipData={chip} {...{
                        forceUpdate,
                        chips,
                        setChips,
                        multiSelect,
                        presetChips,
                        localData,
                        isCustom,
                        resetSelected,
                        isSelected: selected == i,
                        selectThisChip: () => setSelected(i),
                        setActiveColor,
                        setLocalData,
                        startEdits
                    }} />) : displayedChips.filter(({ isCustom }, i) => isCustom || i < 6 && localData?.length).map(({ chip, isCustom }, i) => <Chip chipData={chip} {...{
                        forceUpdate,
                        chips,
                        setChips,
                        multiSelect,
                        presetChips,
                        localData,
                        isCustom,
                        resetSelected,
                        isSelected: selected == i,
                        selectThisChip: () => setSelected(i),
                        setActiveColor,
                        setLocalData,
                        startEdits
                    }} />)}
                    {!displayAll && !localData?.length && <div style={{ margin: '10px', dispaly: 'block' }}>Type to search.</div>}
                </div>
            </div>
        </>
    )
}