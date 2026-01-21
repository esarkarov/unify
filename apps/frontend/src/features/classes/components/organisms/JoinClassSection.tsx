import { Button } from '@/shared/components/ui/button';

interface JoinClassSectionProps {
  onJoinClick?: () => void;
  disabled?: boolean;
}

export const JoinClassSection = ({ onJoinClick, disabled = false }: JoinClassSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="join space-y-3">
        <h2 className="text-lg font-semibold">🎓 Join Class</h2>

        <ol className="ml-5 list-decimal space-y-2 text-sm text-muted-foreground">
          <li>Ask your teacher for the invite code.</li>
          <li>Click on "Join Class" button.</li>
          <li>Paste the code and click "Join"</li>
        </ol>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={onJoinClick}
        disabled={disabled}
        aria-label="Join this class">
        Join Class
      </Button>
    </div>
  );
};
