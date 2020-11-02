# NOTE this is left for backwards compatibility with current mantis-ops/master
#      but can (and should) be removed (along with `nix/*`) once mantis-ops/darwin
#      is merged. kthxbye
{ src    ? ./.
, system ? builtins.currentSystem }:

with import ./nix { inherit system; };

mkYarnPackage {
  src       = mkSrc ./.;

  WEB3_PROVIDER = "/rpc/node";

  doCheck    = true;
  checkPhase = "yarn test --coverage --ci";
  distPhase  = "true";

  buildPhase = ''
    export HOME="$NIX_BUILD_TOP"
    yarn run build
  '';

  installPhase = ''
    mv deps/$pname/build $out
  '';
}
