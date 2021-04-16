{
  description = "Mantis Explorer";

  inputs.utils.url = "github:kreisys/flake-utils";
  inputs.yarn2nix.url = "github:input-output-hk/yarn2nix/pure-nix";

  outputs = { self, nixpkgs, yarn2nix, utils }:
    utils.lib.simpleFlake
      {
        inherit nixpkgs;
        systems = [ "x86_64-linux" "x86_64-darwin" ];
        preOverlays = [ yarn2nix ];
        overlay = final: prev: {
          mantis-explorer = final.callPackage ./package.nix { };
        };

        packages = { mantis-explorer }: {
          inherit mantis-explorer;
          defaultPackage = mantis-explorer;
        };
      };
}
