export default function formatWalletAddress(
  addr: string,
  endPrefix?: number,
  endSuffix?: number,
): string {
  if (!addr) return ''
  if (addr.length <= 12) return addr
  const prefix = addr.substring(0, endPrefix || 8)
  const suffix =
    endSuffix === 0 ? '' : addr.substring(addr.length - (endSuffix || 4))
  return `${prefix}...${suffix}`
}
