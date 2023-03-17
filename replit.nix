{ pkgs }: {
    deps = [
        pkgs.nixStatic
        pkgs.nixStatic
        pkgs.killall
        pkgs.lsof
        pkgs.python39
        pkgs.gcc
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}