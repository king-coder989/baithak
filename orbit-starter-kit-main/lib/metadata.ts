export type AssetType = 'dataset' | 'model' | 'prompt' | 'config';
export type License = 'mit' | 'apache' | 'gpl' | 'cc-by' | 'custom';

export interface AssetMetadata {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  tags: string[];
  license: License;
  uploader: string;
  cid: string;
  size: number;
  sizeFormatted: string;
  isPrivate: boolean;
  accessList?: string[];
  createdAt: number;
  fileName: string;
}

/**
 * Generate unique asset ID
 */
export function generateAssetId(): string {
  return `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create asset metadata object
 */
export function createAssetMetadata(
  name: string,
  description: string,
  type: AssetType,
  tags: string[],
  license: License,
  uploader: string,
  cid: string,
  size: number,
  fileName: string,
  isPrivate: boolean,
  accessList?: string[]
): AssetMetadata {
  return {
    id: generateAssetId(),
    name,
    description,
    type,
    tags,
    license,
    uploader,
    cid,
    size,
    sizeFormatted: formatSize(size),
    isPrivate,
    accessList: accessList || [],
    createdAt: Date.now(),
    fileName,
  };
}

/**
 * Format file size
 */
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate asset metadata
 */
export function validateMetadata(metadata: Partial<AssetMetadata>): string[] {
  const errors: string[] = [];
  
  if (!metadata.name || metadata.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (metadata.name && metadata.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (!metadata.description || metadata.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  if (metadata.description && metadata.description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }
  
  if (!metadata.type) {
    errors.push('Asset type is required');
  }
  
  if (!metadata.cid) {
    errors.push('CID is required');
  }
  
  if (!metadata.uploader) {
    errors.push('Uploader address is required');
  }
  
  return errors;
}

/**
 * Get asset type label
 */
export function getAssetTypeLabel(type: AssetType): string {
  const labels: Record<AssetType, string> = {
    dataset: 'Dataset',
    model: 'Model',
    prompt: 'Prompt',
    config: 'Config',
  };
  return labels[type];
}

/**
 * Get asset type color
 */
export function getAssetTypeColor(type: AssetType): string {
  const colors: Record<AssetType, string> = {
    dataset: 'bg-blue-100 text-blue-800',
    model: 'bg-purple-100 text-purple-800',
    prompt: 'bg-green-100 text-green-800',
    config: 'bg-orange-100 text-orange-800',
  };
  return colors[type];
}

/**
 * Get license label
 */
export function getLicenseLabel(license: License): string {
  const labels: Record<License, string> = {
    mit: 'MIT',
    apache: 'Apache 2.0',
    gpl: 'GPL-3.0',
    'cc-by': 'CC BY 4.0',
    custom: 'Custom',
  };
  return labels[license];
}

/**
 * Format relative time
 */
export function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
