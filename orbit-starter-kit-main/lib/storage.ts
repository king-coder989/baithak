import { AssetMetadata } from './metadata';

const STORAGE_KEY = 'baithak_assets';

/**
 * Save asset metadata to localStorage
 */
export function saveAsset(metadata: AssetMetadata): void {
  try {
    const assets = getAssets();
    assets.push(metadata);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Failed to save asset:', error);
    throw new Error('Failed to save asset to local storage');
  }
}

/**
 * Get all assets from localStorage
 */
export function getAssets(): AssetMetadata[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get assets:', error);
    return [];
  }
}

/**
 * Get asset by ID
 */
export function getAssetById(id: string): AssetMetadata | null {
  const assets = getAssets();
  return assets.find(asset => asset.id === id) || null;
}

/**
 * Get asset by CID
 */
export function getAssetByCid(cid: string): AssetMetadata | null {
  const assets = getAssets();
  return assets.find(asset => asset.cid === cid) || null;
}

/**
 * Get assets by uploader address
 */
export function getAssetsByUploader(address: string): AssetMetadata[] {
  const assets = getAssets();
  return assets.filter(asset => 
    asset.uploader.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Filter assets by type
 */
export function filterAssetsByType(type: string): AssetMetadata[] {
  if (type === 'all') return getAssets();
  const assets = getAssets();
  return assets.filter(asset => asset.type === type);
}

/**
 * Search assets by query
 */
export function searchAssets(query: string): AssetMetadata[] {
  if (!query.trim()) return getAssets();
  
  const assets = getAssets();
  const lowerQuery = query.toLowerCase();
  
  return assets.filter(asset => 
    asset.name.toLowerCase().includes(lowerQuery) ||
    asset.description.toLowerCase().includes(lowerQuery) ||
    asset.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Sort assets
 */
export function sortAssets(
  assets: AssetMetadata[],
  sortBy: 'newest' | 'oldest' | 'name' | 'size'
): AssetMetadata[] {
  const sorted = [...assets];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'size':
      return sorted.sort((a, b) => b.size - a.size);
    default:
      return sorted;
  }
}

/**
 * Update asset metadata
 */
export function updateAsset(id: string, updates: Partial<AssetMetadata>): void {
  try {
    const assets = getAssets();
    const index = assets.findIndex(asset => asset.id === id);
    
    if (index === -1) {
      throw new Error('Asset not found');
    }
    
    assets[index] = { ...assets[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Failed to update asset:', error);
    throw new Error('Failed to update asset');
  }
}

/**
 * Delete asset
 */
export function deleteAsset(id: string): void {
  try {
    const assets = getAssets();
    const filtered = assets.filter(asset => asset.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete asset:', error);
    throw new Error('Failed to delete asset');
  }
}

/**
 * Clear all assets
 */
export function clearAssets(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear assets:', error);
    throw new Error('Failed to clear assets');
  }
}

/**
 * Get statistics
 */
export function getStats(address?: string) {
  const assets = address ? getAssetsByUploader(address) : getAssets();
  
  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
  
  const typeCount = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalAssets: assets.length,
    totalSize,
    publicAssets: assets.filter(a => !a.isPrivate).length,
    privateAssets: assets.filter(a => a.isPrivate).length,
    byType: typeCount,
  };
}
