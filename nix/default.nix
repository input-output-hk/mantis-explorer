{ system ? builtins.currentSystem }:

with import ./sources.nix;

let
  pkgs = import nixpkgs { inherit system; config = {}; overlays = []; };
  inherit (import gitignore { inherit (pkgs) lib; }) gitignoreSource;

in {
  inherit pkgs;
  inherit (import yarn2nix { inherit pkgs; }) mkYarnPackage mkYarnNix importOfflineCache;

  mkSrc = src: let
    isGit = builtins.pathExists (src + "/.git");
    repo  = builtins.fetchGit src;
    dirty = repo.revCount == 0;
  in
    if isGit then
      if dirty then gitignoreSource src
      else repo
    else src;
}
