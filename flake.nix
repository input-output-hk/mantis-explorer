{
  description = "Mantis Explorer";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.simpleFlake rec {
      inherit self nixpkgs;
      systems = [ "x86_64-linux" "x86_64-darwin" ];
      name = "mantis-explorer";
      overlay = final: prev: {
        ${name}.defaultPackage = final.callPackage ./package.nix {};
      };
    };
}
