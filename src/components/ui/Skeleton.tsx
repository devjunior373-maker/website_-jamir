import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-[5px] bg-gray-200 animate-pulse",
        className
      )}
      style={{ animationDuration: '1.8s' }}
    />
  );
}
