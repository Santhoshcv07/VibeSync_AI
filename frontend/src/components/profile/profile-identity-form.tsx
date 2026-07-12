"use client";

import { VibeProfileData } from "./profile.data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileIdentityFormProps {
  profile: VibeProfileData;
  draftProfile: VibeProfileData;
  isEditing: boolean;
  errors: {
    displayName?: string;
    bio?: string;
  };
  onStartEditing: () => void;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileIdentityForm({
  profile,
  draftProfile,
  isEditing,
  errors,
  onStartEditing,
  onDisplayNameChange,
  onBioChange,
  onSave,
  onCancel,
}: ProfileIdentityFormProps) {
  if (!isEditing) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1.5">
            <CardTitle className="text-xl">Profile identity</CardTitle>
            <CardDescription className="text-zinc-400">
              Preview how your name and short Vibe description may appear across the product.
            </CardDescription>
          </div>
          <Button variant="secondary" size="sm" onClick={onStartEditing}>
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 border-t border-zinc-800">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">Display name</p>
            <p className="text-base text-zinc-200">{profile.displayName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">Profile handle</p>
            <p className="text-base text-zinc-200">{profile.handle}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">About this Vibe</p>
            <p className="text-base text-zinc-200 max-w-2xl leading-relaxed">
              {profile.bio || "No bio added."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/30 bg-zinc-900/80 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5">
      <CardHeader>
        <CardTitle className="text-xl">Edit Profile identity</CardTitle>
        <CardDescription className="text-zinc-400">
          Update your fictional identity. Changes remain local to this session.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4 border-t border-zinc-800">
        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="profile-displayName" className="text-sm font-medium text-zinc-200">
              Display name
            </label>
            <Input
              id="profile-displayName"
              value={draftProfile.displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
              aria-invalid={!!errors.displayName}
              aria-describedby="displayName-hint displayName-error"
              className="bg-zinc-950 border-zinc-800 max-w-md"
            />
            {errors.displayName ? (
              <p id="displayName-error" className="text-sm text-red-400 font-medium">
                {errors.displayName}
              </p>
            ) : (
              <p id="displayName-hint" className="text-xs text-zinc-500">
                Use 2–40 characters.
              </p>
            )}
          </div>

          <div className="space-y-1 pt-2">
            <label htmlFor="profile-handle" className="text-sm font-medium text-zinc-200">
              Profile handle
            </label>
            <Input
              id="profile-handle"
              value={profile.handle}
              disabled
              className="bg-zinc-900 border-zinc-800 max-w-md text-zinc-500 cursor-not-allowed opacity-70"
            />
            <p className="text-xs text-zinc-500">
              Handles cannot be changed in this prototype.
            </p>
          </div>

          <div className="space-y-1 pt-2">
            <label htmlFor="profile-bio" className="text-sm font-medium text-zinc-200">
              Profile bio
            </label>
            <Textarea
              id="profile-bio"
              value={draftProfile.bio}
              onChange={(e) => onBioChange(e.target.value)}
              aria-invalid={!!errors.bio}
              aria-describedby="bio-hint bio-error"
              className="bg-zinc-950 border-zinc-800 max-w-xl min-h-[100px] resize-y"
            />
            {errors.bio ? (
              <p id="bio-error" className="text-sm text-red-400 font-medium">
                {errors.bio}
              </p>
            ) : (
              <p id="bio-hint" className="text-xs text-zinc-500">
                Use up to 160 characters.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-zinc-800">
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
