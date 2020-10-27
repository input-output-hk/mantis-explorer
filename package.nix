{ mkYarnPackage }:

mkYarnPackage {
  src       = ./.;

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
