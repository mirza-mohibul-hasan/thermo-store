class Test {
    public static void main(String[] args) {
        Base b = new Subclass();
        System.out.println(b.x);
        System.out.println(b.method());
    }
}

class Base {
    int x = 2;

    int method() {
        return x;
    }
}

class Subclass extends Base {
    int x = 3;

    int method() {
        return x;
    }
}