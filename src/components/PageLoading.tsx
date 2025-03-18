
import { Loader2 } from 'lucide-react';

const PageLoading = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="animate-fade-in flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoading;
