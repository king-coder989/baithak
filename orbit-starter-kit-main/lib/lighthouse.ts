import lighthouse from '@lighthouse-web3/sdk';

export interface UploadResult {
  Hash: string;
  Name: string;
  Size: string;
}

export interface ProgressData {
  total: number;
  uploaded: number;
}

export type ProgressCallback = (progress: ProgressData) => void;

/**
 * Upload file to Lighthouse/IPFS
 */
export async function uploadFile(
  files: FileList,
  apiKey: string,
  progressCallback?: ProgressCallback
): Promise<UploadResult> {
  try {
    const output = await lighthouse.upload(files, apiKey, undefined, progressCallback);
    
    if (!output?.data?.Hash) {
      throw new Error('Upload failed: no CID returned');
    }
    
    return output.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Upload failed');
  }
}

/**
 * Upload file with encryption (private files)
 */
export async function uploadWithEncryption(
  files: FileList,
  apiKey: string,
  publicKey: string,
  signedMessage: string,
  progressCallback?: ProgressCallback
): Promise<UploadResult> {
  try {
    const output = await lighthouse.uploadEncrypted(
      files,
      apiKey,
      publicKey,
      signedMessage,
      progressCallback
    );
    
    if (!output?.data?.[0]?.Hash) {
      throw new Error('Encrypted upload failed: no CID returned');
    }
    
    return output.data[0];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Encrypted upload failed');
  }
}

/**
 * Share access to encrypted file
 */
export async function shareAccess(
  cid: string,
  publicKey: string,
  addresses: string[],
  signedMessage: string
): Promise<void> {
  try {
    await lighthouse.shareFile(publicKey, addresses, cid, signedMessage);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to share access');
  }
}

/**
 * Revoke access to encrypted file
 */
export async function revokeAccess(
  cid: string,
  publicKey: string,
  addresses: string[],
  signedMessage: string
): Promise<void> {
  try {
    await lighthouse.revokeAccess(publicKey, addresses, cid, signedMessage);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to revoke access');
  }
}

/**
 * Get access control list for a file
 */
export async function getAccessList(cid: string): Promise<string[]> {
  try {
    const response = await lighthouse.getAccessConditions(cid);
    return response?.data?.sharedTo || [];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get access list');
  }
}

/**
 * Get file info from Lighthouse
 */
export async function getFileInfo(cid: string): Promise<any> {
  try {
    const response = await lighthouse.getFileInfo(cid);
    return response?.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get file info');
  }
}

/**
 * Generate gateway URL for IPFS content
 */
export function getGatewayUrl(cid: string): string {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
}

/**
 * Format file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
