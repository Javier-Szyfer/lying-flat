import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectBtn() {
  return (
    <ConnectButton
      showBalance={false}
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
    />
  );
}
