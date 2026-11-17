"use client";

import { useState, type FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  Button,
  Callout,
  Checkbox,
  CloseIcon,
  CrystalIcon,
  Dialog,
  DialogClose,
  EquipmentSlot,
  FeatureAction,
  GemIcon,
  IconButton,
  InfoIcon,
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MoreIcon,
  Popover,
  RadioGroup,
  RewardTile,
  Select,
  SettingsIcon,
  SwapIcon,
  SwordIcon,
  TextArea,
  TextField,
  TicketIcon,
  Tooltip,
} from "@/components/omnia-ui";
import styles from "./showcase.module.css";

export function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  const run = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };
  return (
    <div className={styles.row}>
      <Button variant="primary" loading={loading} onClick={run}>
        Save changes
      </Button>
      <Button variant="secondary" loading={loading} onClick={run}>
        Sync
      </Button>
      <span className={styles.note} role="status">
        {loading ? "Saving…" : "Activate a button to see its loading state."}
      </span>
    </div>
  );
}

interface Errors {
  name?: string;
  role?: string;
  terms?: string;
}

export function FormDemo() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter a party name.";
    if (!data.get("role")) next.role = "Choose a leader role.";
    if (!data.get("terms")) next.terms = "Confirm the party rules to continue.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  return (
    <form noValidate onSubmit={submit} className={styles.stack}>
      <TextField name="name" label="Party name" required error={errors.name} description="Up to 24 characters." maxLength={24} />
      <Select
        name="role"
        label="Leader role"
        required
        error={errors.role}
        placeholder="Choose a role"
        options={[
          { value: "vanguard", label: "Vanguard" },
          { value: "arcanist", label: "Arcanist" },
          { value: "ranger", label: "Ranger" },
          { value: "cleric", label: "Cleric" },
        ]}
      />
      <TextArea name="notes" label="Notes" description="Optional. Visible only to you." rows={3} />
      <Checkbox name="terms" label="I have read the party rules" required error={errors.terms} />
      <div className={styles.row}>
        <Button type="submit" variant="primary">
          Create party
        </Button>
        <Button type="reset" variant="ghost" onClick={() => (setErrors({}), setSubmitted(false))}>
          Reset
        </Button>
      </div>
      <div role="status">
        {submitted && (
          <Callout tone="success" title="Party created">
            Your new party is ready.
          </Callout>
        )}
      </div>
    </form>
  );
}

export function ChoiceDemo() {
  return (
    <div className={styles.grid2}>
      <div className={styles.stack}>
        <Checkbox label="Show cleared quests" defaultChecked />
        <Checkbox label="Select all rewards" indeterminate description="Some rewards are selected." />
        <Checkbox label="Unavailable option" disabled />
      </div>
      <RadioGroup
        label="Difficulty"
        defaultValue="normal"
        options={[
          { value: "story", label: "Story", description: "Focus on the narrative." },
          { value: "normal", label: "Normal" },
          { value: "hard", label: "Hard" },
          { value: "lunatic", label: "Lunatic", disabled: true, description: "Clear Hard first." },
        ]}
      />
    </div>
  );
}

export function OverlayDemo() {
  const [lastAction, setLastAction] = useState("No menu action yet.");
  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <Dialog
          trigger={<Button variant="secondary">Open dialog</Button>}
          title="Rename party"
          description="Give this party a name you will recognise."
          actions={
            <>
              <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
              <DialogClose render={<Button variant="primary" />}>Save</DialogClose>
            </>
          }
        >
          <TextField label="Party name" defaultValue="Dawn Wardens" autoFocus />
        </Dialog>

        <AlertDialog
          trigger={<Button variant="danger">Discard changes</Button>}
          title="Discard unsaved changes?"
          description="Your edits to this party will be lost."
          actions={
            <>
              <AlertDialogClose render={<Button variant="secondary" />}>Keep editing</AlertDialogClose>
              <AlertDialogClose render={<Button variant="danger" />}>Discard</AlertDialogClose>
            </>
          }
        />

        <Menu trigger={<Button variant="secondary" endIcon={<MoreIcon size={16} />}>Actions</Button>}>
          <MenuGroup label="Member">
            <MenuItem icon={<SwapIcon size={16} />} onClick={() => setLastAction("Swap selected")}>
              Swap member
            </MenuItem>
            <MenuItem icon={<SwordIcon size={16} />} onClick={() => setLastAction("Equipment selected")}>
              View equipment
            </MenuItem>
            <MenuItem disabled icon={<SettingsIcon size={16} />}>
              Configure (unavailable)
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem tone="danger" icon={<CloseIcon size={16} />} onClick={() => setLastAction("Remove selected")}>
            Remove from party
          </MenuItem>
        </Menu>

        <Popover
          trigger={<IconButton label="About power crystals" icon={<InfoIcon />} variant="outline" />}
          title="Power crystals"
          description="Used to raise a character's level cap. Earned from quests and missions."
          openOnHover
        />

        <Tooltip content="Supplementary hint — never essential information">
          <IconButton label="Crystal settings" icon={<CrystalIcon />} />
        </Tooltip>
      </div>
      <p role="status" className={styles.note}>
        {lastAction}
      </p>
    </div>
  );
}

export function InteractiveSignatureDemo() {
  const [selections, setSelections] = useState(0);
  const [claimed, setClaimed] = useState(false);
  return (
    <div className={styles.grid2}>
      <div className={styles.stack}>
        <p className={styles.label}>EquipmentSlot · interactive</p>
        <EquipmentSlot
          slot="Weapon"
          icon={<SwordIcon size={24} />}
          item={{ name: "Dawnglass Blade", rarity: { tier: 5, label: "Legendary" }, detail: "Lv 40 / 40", tone: "gold" }}
          onSelect={() => setSelections((n) => n + 1)}
        />
        <EquipmentSlot slot="Charm" icon={<CrystalIcon size={24} />} item={null} onSelect={() => setSelections((n) => n + 1)} />
        <p className={styles.note} role="status">
          Slot activated {selections} {selections === 1 ? "time" : "times"}.
        </p>
      </div>
      <div className={styles.stack}>
        <p className={styles.label}>FeatureAction · button</p>
        <FeatureAction
          icon={<TicketIcon size={24} />}
          title="Redeem a code"
          description="Opens a form; this is an action, so it renders a button."
          onClick={() => setClaimed(false)}
        />
        <p className={styles.label}>RewardTile · claim flow</p>
        <RewardTile
          layout="row"
          name="Gems"
          icon={<GemIcon size={24} />}
          quantity={300}
          state={claimed ? "claimed" : "claimable"}
          onClaim={() => setClaimed(true)}
        />
      </div>
    </div>
  );
}
