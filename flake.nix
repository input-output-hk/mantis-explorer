{
  description = "Mantis Explorer";

  inputs.utils.url = "github:kreisys/flake-utils";

  outputs = { self, nixpkgs, utils }:
    utils.lib.simpleFlake
      {
        inherit nixpkgs;
        name = "mantis-explorer";
        systems = [ "x86_64-linux" "x86_64-darwin" ];
        overlay = final: prev: {
          mantis-explorer = final.callPackage ./package.nix { };
        };

        packages = { mantis-explorer }: {
          inherit mantis-explorer;
          defaultPackage = mantis-explorer;
        };
      };
}
