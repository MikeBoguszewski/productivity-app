import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/firebase";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await requestPasswordReset(email);
    if (result.success) {
      toast.success("Password reset link sent. Check your email.");
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer">Forgot your password?</span>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Enter your email address to receive a password reset link.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={handleChange} />
            </div>
            <DialogClose asChild>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
